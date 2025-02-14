import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setPageSize, setSortProperty } from '../data/ActionCreators';

const mapStateToProps = dataStore => dataStore;
const mapDispatchToProps = { setPageSize, setSortProperty};

const mergeProps = (dataStore, actinCreators, router) => ({
    ...dataStore,
    ...actinCreators,
    ...router,
    currentPage: Number(router.match.params.page),
    pageCout: Math.ceil(
        (dataStore.products_total | dataStore.setPageSize || 5)/(dataStore.pageSize || 5)
        ),
    navigateToPage: (page) => router.history
        .push(`/shop/products/${router.match.params.category}/${page}`),
})

export const ProductPageConnector = PageComponent => withRouter(
    connect(mapStateToProps, mapDispatchToProps, mergeProps)(PageComponent)
)