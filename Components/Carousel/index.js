import React, { useContext, useEffect, useRef, useState } from "react";
import styles from '@/styles/carousel.module.css';
import Image from "next/image";
import { renderProducts } from "./hooks";
import { DataContext } from "Components/Context";

const Carousel = ({dataProducts}) => {
    const [widthCarousel, setWidthCarousel] = useState();
    const carouselRef = useRef(null);
    const { section, setSection } = useContext(DataContext);

    useEffect(() => {
        setWidthCarousel(Math.floor(((window.innerWidth / 100) * 90) / (278 + 20)) * (278 + 20)); 
    }, []);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 360) {
                setWidthCarousel(Math.floor(((window.innerWidth / 100) * 90) / (278 + 20)) * (278 + 20));  
            }
        });
    }, []);

    useEffect(() => {
        if (section) {
            carouselRef.current.scrollTo({left: 0});
        }
    }, [section]);

    return (
        <div className={styles.carousel}>
            <div className={styles.containerCarousel}>
                <Image width={30} height={30} src='/line.svg' alt="line" style={{cursor: 'pointer'}} onClick={() => { carouselRef.current.scrollBy({behavior: 'smooth', left: -278 - 20}) }}/>
                <div className={styles.containerProducts} ref={carouselRef} style={{width: widthCarousel}}>
                    <div className={styles.carouselProducts}>
                        { dataProducts ? 
                            renderProducts(dataProducts, section)
                        : null }
                    </div>
                </div>
                <Image width={30} height={30} src='/line.svg' className={styles.lineRight} alt="line" style={{cursor: 'pointer'}} onClick={() => carouselRef.current.scrollBy({behavior: 'smooth', left: 278 + 20})}/>
            </div>
        </div>
    )
}

export default Carousel;