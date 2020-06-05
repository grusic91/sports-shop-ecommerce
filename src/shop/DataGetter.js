import React, { Component } from 'react';
import { DataTypes } from '../data/Types';

export class DataGetter extends Component {
    render() {
        return <React.Fragment>
            {
                this.props.children
            }
        </React.Fragment>
    }

    componentDidUpdate = () => this.getData();
    componentDidMount = () => this.getData();

    getData = () => {
        const dsData = this.props.products_params || {};
        const rtData = {
            _limit: this.props.pageSize || 5,
            _sort: this.props.sortKey || "name",
            _page: this.props.match.params.page || 1,
            category_like: (this.props.match.params.category || "") === "all"
             ? "" : this.props.match.params.category
        }

        if (Object.keys(rtData).find(key => dsData[key] !== rtData[key])) {
            this.props.loadData(DataTypes.PRODUCTS, rtData);
        }
    }
}

/* 
    Component renders the content its parent provides children props
    This component receive details of the current route and its parameters 
    and also access the data store.

    lifecicle methods call getData() which gets the parameters from URL and comapres them
    with those in the data store that were added after the last request. If there has
    been a change, a new action is dispatched that will load the data the user requires
    _sort and _limit parameters values are used for sorting and for setting the page size
    will be obtained from the data store

*/