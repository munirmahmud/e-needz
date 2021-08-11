import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Product from '~/components/elements/products/Product';
import { carouselStandard } from '~/utilities/carousel-helpers';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';

const CustomerBought = ({ collectionSlug, boxed, layout }) => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getProducts() {
        setLoading(true);
        const responseData = await getProductsByCollectionHelper(
            collectionSlug
        );
        if (responseData) {
            setProductItems(responseData.items);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        getProducts();
    }, [collectionSlug]);

    // Views
    let carouselView;
    if (!loading) {
        if (productItems) {
            if ((layout = 'fullwidth')) {
                carouselView = (
                    // <Slider
                    //     {...carouselFullwidth}
                    //     className="ps-carousel outside">
                    //     {productItems.map((item, index) => {
                    //         if (index < 8) {
                    //             return <Product product={item} key={item.id} />;
                    //         }
                    //     })}
                    // </Slider>
                    <div className="row">
                        {productItems.map((item, index) => (
                            <div key={item.id} className="col-md-2">
                                {index < 16 && <Product product={item} />}
                            </div>
                            // if (index < 8) {
                            //     return <Product product={item}  />;
                            // }
                        ))}
                    </div>
                );
            } else {
                carouselView = (
                    <Slider
                        {...carouselStandard}
                        className="ps-carousel outside">
                        {productItems.map((item, index) => {
                            if (index < 8) {
                                return <Product product={item} key={item.id} />;
                            }
                        })}
                    </Slider>
                );
            }
        } else {
            carouselView = <p>No product found.</p>;
        }
    } else {
        carouselView = <p>Loading...</p>;
    }

    return (
        <div
            className={`ps-section--default ps-customer-bought ${
                boxed === true ? 'boxed' : ''
            }`}>
            <div className="ps-section__header d-flex align-items-center justify-content-between">
                <h3>Customers who bought this item also bought</h3>

                <div className="search-products">
                    <div className="ps-form__input">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
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
            <div className="ps-section__content">{carouselView}</div>
        </div>
    );
};

export default CustomerBought;
