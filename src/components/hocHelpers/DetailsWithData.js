import React from "react";
import Spinner from "../spinner";
import ErrorIndicator from "../Error-indicator";
import {Record} from "../item-details/ItemDetails";

const detailsWithData = View => {
  return class extends React.Component {
    state = {
      item: null,
      loading: true,
      hasError: false,
      loadingClass: null
    };

    componentDidMount() {
      this.updateItem();
    }

    componentDidUpdate(prevProps) {
      if (this.props.itemId !== prevProps.itemId) {
        this.updateItem();
      }
    }

     updateItem() {
      const {itemId, getData, checkLoading} = this.props;
      this.setState(({loading, loadingClass}) => {
        loading = true;
        loadingClass = `item-loading`;
        checkLoading(loading);
        return {
          loading,
          loadingClass
        };
      });

      if (!itemId) this.setState({loading: false, hasError: true});
       getData(itemId)
        .then(elem => {
          this.setState(({item, loading, loadingClass}) => {
            item = elem;
            loading = false; 
            loadingClass = null;
            checkLoading(loading);
            return {
              item,
              loading,
              loadingClass
            }
          })
        })
        .catch(() => this.setState({loading: false, hasError: true}));
    }

    makeDetails(item) {
      const transformStr = str => {
        // Найти первое слово до заглавной буквы
        // Первое пишется с маленькой
        const firstWord = str.match(/^[a-z]*/g).join(``);

        // Срезать первую букву у первого слова и сделать её заглавной
        // Затем срезать все остальные буквы у этого слова
        // и получив слово с заглавной буквы склеить вместе
        const firstLetter = firstWord.slice(0, 1).toUpperCase();
        const newFirstWord = `${firstLetter}${firstWord.slice(1)}`;

        // Найти слова начинающиеся с заглавной
        // И соединить их вместе с первым
        const matchRest = str.match(/[A-Z][a-z]*/g);
        const rest = matchRest !== null ? matchRest.join(` `) : null;
        const result = `${newFirstWord} ${rest}`;
        // Если в предложении одно слово, вернуть его
        // Иначе всё вместе
        return !rest ? newFirstWord : result;
      };

      const makeFields = () => {
        const arr = [];
        for (let key in item) {
          if (
            key !== `id` &&
            key !== `name` &&
            key !== `image` &&
            key !== `active` &&
            key !== `type`
          )
            arr.push(key);
        }
        return arr;
      };

      return makeFields().map((elem, i) => {
        return <Record key={i} field={elem} label={transformStr(elem)} />;
      });
    }

    render() {
      const {item, loading, hasError, loadingClass} = this.state;
      const spinner = loading ? <Spinner /> : null;
      const error = hasError ? <ErrorIndicator /> : null;

      return (
        <View {...this.props} data={{item, spinner, error, loadingClass}}>
          {!item ? null : this.makeDetails(item)}
        </View>
      );
    }
  };
};

export default detailsWithData;
