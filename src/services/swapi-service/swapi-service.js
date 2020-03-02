import imgnotfound from "./imagenotfound.jpg";

export default class SwapiService {
  apiBase = `https://swapi.co/api`;
  imgSrc = `https://starwars-visualguide.com/assets/img/`;
  peoplesObj = {
    arr: []
  };
  planetsObj = {
    arr: []
  };
  starshipsObj = {
    arr: []
  };

  async imageLoaded(url) {
    let src;
    await new Promise((res, rej) => {
      const image = new Image();
      image.src = `${this.imgSrc}${url}.jpg`;
      image.onload = () => res(image.src);
      image.onerror = () => rej(imgnotfound);
    })
      .then(good => (src = good))
      .catch(fail => (src = fail));
    return src;
  }

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    try {
      return await res.json();
    } catch (err) {
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
      }
    }
  }

  getAll = async (target, callback) => {
    const all = await this.getResource(`/${target}/`);
    return all.results.map(callback);
  };

  getNextListPage = async (target, n, listObj, callback) => {
    await this.getResource(`/${target}/?page=${n}`)
      .then(data => {
        const {count, results} = data;
        const maxCount = Math.ceil(count / 10);
        results.forEach(elem => listObj.arr.push(callback(elem)));
        listObj.maxCount = maxCount;
      })
      .catch(err => console.error(`Too match: ${err}`));
    return listObj;
  };

  getAllPeople = async n => {
    return this.getNextListPage(
      `people`,
      n,
      this.peoplesObj,
      this.transformPerson
    );
  };

  getAllPlanets = async n => {
    return this.getNextListPage(
      `planets`,
      n,
      this.planetsObj,
      this.transformPlanet
    );
  };

  getAllStarships = async n => {
    return this.getNextListPage(
      `starships`,
      n,
      this.starshipsObj,
      this.transformStarship
    );
  };

  getPerson = async id => {
    const person = await this.getResource(`/people/${id}`);
    const image = await this.imageLoaded(`/characters/${id}`);
    return this.transformPerson(person, image);
  };

  getPlanet = async id => {
    const planet = await this.getResource(`/planets/${id}`);
    const image = await this.imageLoaded(`/planets/${id}`);
    return this.transformPlanet(planet, image);
  };

  getStarship = async id => {
    const ship = await this.getResource(`/starships/${id}`);
    const image = await this.imageLoaded(`/starships/${id}`);
    return this.transformStarship(ship, image);
  };

  extractId = elem => {
    const regexp = /\/([0-9]*)\/$/;
    const id = elem.url.match(regexp)[1];
    return id;
  };

  transformPlanet = (planet, src) => {
    return {
      id: this.extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
      climate: planet.climate,
      surfaceWater: planet.surface_water,
      terrain: planet.terrain,
      image: src,
      active: null
    };
  };

  transformStarship = (starship, src) => {
    return {
      id: this.extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
      image: src,
      active: null
    };
  };

  transformPerson = (person, src) => {
    return {
      id: this.extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      height: person.height,
      mass: person.mass,
      hairColor: person.hair_color,
      eyeColor: person.eye_color,
      image: src,
      active: null
    };
  };
}
