import Link from 'next/link';
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import ProductDealOfDay from '~/components/elements/products/ProductDealOfDay';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import useGetProducts from '~/hooks/useGetProducts';
import { carouselFullwidth } from '~/utilities/carousel-helpers';
import { generateTempArray } from '~/utilities/common-helpers';

const HomeDefaultDealOfDay = ({ collectionSlug }) => {
    const { productItems, loading, getProductsByCollection } = useGetProducts();

    useEffect(() => {
        getProductsByCollection(collectionSlug);
    }, [collectionSlug]);

    // Views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            const slideItems = productItems.map((item) => (
                <ProductDealOfDay product={item} key={item.id} />
            ));
            productItemsView = (
                <Slider {...carouselFullwidth} className="ps-carousel outside">
                    {slideItems}
                </Slider>
            );
        } else {
            productItemsView = <p>No product(s) found.</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }

    return (
        <div className="ps-deal-of-day">
            <div className="ps-container">
                <div className="section-white">
                    <div className="ps-section__header">
                        <div className="ps-block--countdown-deal">
                            <div className="ps-block__left">
                                <h3>Features Products</h3>
                            </div>
                        </div>
                        <div className="search-products">
                            <div className="ps-form__input">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="I'm shopping for..."
                                />
                            </div>
                            <button className="ps-btn">
                                <img
                                    src="/static/icons/magnifiying-glass.svg"
                                    alt="Search Products"
                                />
                            </button>
                            <Link href="/shop">
                                <a className="ps-btn view-all">View all</a>
                            </Link>
                        </div>
                    </div>

                    <div className="ps-section__content">
                        {productItemsView}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeDefaultDealOfDay;
