import React from "react";
import Spinner from "../spinner";
import ErrorIndicator from "../Error-indicator";

const withData = View => {
  return class extends React.Component {
    state = {
      data: null,
      loading: true,
      error: false,
      loadingClass: null
    };

    pageNum = 1;
    mobButtonActive = false;

    componentDidMount() {
      this.downloadListItems();
      this.props.checkLoading(this.state.loading);
    }

    activateItem = (n, arr) => {
      this.setState(({data}) => {
        const clone = arr.map((elem, i, array) => {
          elem.active = null;
          array[n].active = `active-item-list`;
          return elem;
        });

        return {
          data: clone
        };
      });
    };

    async downloadListItems() {
      const {checkLoading, getData} = this.props;
      this.setState({loading: true, loadingClass: `list-loading`});
      this.setState(({loading}) => checkLoading(loading));
      await getData(this.pageNum)
        .then(res => {
          const {maxCount, arr} = res;
          this.maxCount = maxCount;
          this.setState({
            data: arr,
            loading: false,
            loadingClass: null
          });
        })
        .catch(() => this.setState({loading: false, error: true}));
      checkLoading(this.state.loading);
    }

    lazyLoad = e => {
      const target = e.currentTarget;
      const childrens = e.currentTarget.children;
      let sum = 0;
      for (let i = 0; i < childrens.length; i++) sum += childrens[i].offsetHeight;
      
      const scrollPlusHeight = Math.ceil(target.scrollTop + target.clientHeight) + 1;
      if (scrollPlusHeight >= sum && this.pageNum < this.maxCount) {
          ++this.pageNum;
          this.downloadListItems();
      }
    };

    componentDidUpdate(prevProps) {
      if (this.props.mobile && this.mobButtonActive) {
        if(prevProps.load !== this.props.load) {
          this.change(this.props.load);
        }
      }
    }

    change(load) {
      if (!load) {
        this.setState({loading: true, loadingClass: `list-loading`});
      } else {
        this.setState({loading: false, loadingClass: null});
        this.props.rotateBlock({list: `choose-item`, details: `item`});
        this.mobButtonActive = false;
      }
    }

    mobileButton = () => {
      this.mobButtonActive = true;
    };

    render() {
      const {data, loading, error, loadingClass} = this.state;
      const errorIdicator = error ? <ErrorIndicator /> : null;
      const load = loading ? <Spinner /> : null;
      return (
        <View
          {...this.props}
          rest={{data, errorIdicator, load, loadingClass}}
          activateItem={this.activateItem}
          lazyLoad={this.lazyLoad}
          mobileButton={this.mobileButton}
        />
      );
    }
  };
};

export default withData;
