import Hero from '@/components/homePage/Hero'
import ProductCard from '@/components/ProductCard'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import banner from '../assets/bgFixed.png';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { useGetProductsQuery } from '@/app/features/api/productApiSlice';
import { useGetProductsByCategoryQuery } from '@/app/features/api/productApiSlice';
import { MdDeliveryDining } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { MdOnlinePrediction } from "react-icons/md";

const Home = () => {
    const { data: products } = useGetProductsQuery({ page: 1, pageSize: 5 })
    const { data } = useGetProductsByCategoryQuery(3)
    const { data: vegetables } = useGetProductsByCategoryQuery(4)
    const service = [
        {
            icon: <MdDeliveryDining className='w-7 h-7' />,
            text: 'DOOR STEP DELIVERY'
        },
        {
            icon: <BiSupport className='w-7 h-7' />,
            text: '24 x 7 SERVICE'
        },
        {
            icon: <MdOnlinePrediction className='w-7 h-7' />,
            text: 'ONLINE SUPPORT'
        },
    ]


    return (
        <div>
            <Hero />

            <div className='w-full 2xl:w-[70%] mx-auto lg:px-10 px-5 mt-10'>
                {/* NEW ARRIVALS CAROUSEL SECTION */}
                <div className='w-full mb-10'>
                    <h1 className='uppercase font-semibold text-primary text-lg'>New Arrivals</h1>
                    <hr className='h-[2px] bg-black/30' />

                    <div className='w-full my-5 '>
                        <Carousel opts={{
                            align: "start",
                            loop: true,
                        }}
                            plugins={[
                                Autoplay({
                                    delay: 4000,
                                }),
                            ]} className='lg:w-[95%] mb-10 mx-auto'>
                            <CarouselContent>
                                {products?.products?.slice(0, 5).map((product, index) => (
                                    <CarouselItem key={index} className='basis-2/3 lg:basis-1/4 2xl:basis-2/6'>
                                        <ProductCard {...product} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext className='hidden lg:flex bg-primary text-white' />
                            <CarouselPrevious className='hidden lg:flex bg-primary/80 text-white' />
                        </Carousel>
                    </div>
                </div>

                {/* WHY US SECTION */}
                <div className='my-10 w-full h-full  border-t-[1px] border-b-[1px] border-black/30 py-5 flex flex-col lg:flex-row items-center justify-center lg:gap-20 gap-5'>
                    {service?.map((item, index) => (
                        <div key={index} className='lg:w-1/3 w-full bg-primary lg:bg-transparent h-full flex items-center justify-start uppercase lg:border-b-0 last:border-b-0 lg:border-r-[1px] last:border-r-0 border-black/30 gap-5 px-5 py-4 lg:py-0'>
                            {/* <img src={item.icon} className='w-10 h-10' /> */}
                            <span className='text-secondary lg:bg-primary p-2 rounded-full'> {item.icon}</span>
                            <p className='text-white lg:text-primary'>{item.text}</p>
                        </div>
                    ))}
                </div>


                {/* BANNER AREA */}
                <div style={{ backgroundImage: `url(${banner})` }} className='w-full h-[541px] my-10 bg-fixed bg-cover bg-center bg-no-repeat relative overflow-hidden home-banner'>
                    <div className='absolute top-1/3 px-10 lg:bg-transparent bg-black/30 p-3 lg:p-0'>
                        <h1 className='lg:text-8xl text-7xl text-white drop-shadow-lg font-semibold'>BEST DEALS</h1>
                        <Link to="/shop">
                            <Button className='text-white w-[250px] h-[60px] text-lg drop-shadow-md mt-2'>
                                Shop Now
                            </Button>
                        </Link>
                    </div>
                </div>


                {/* DRINKS CAROUSEL SECTION */}
                <div className='w-full mb-10'>
                    <h1 className='uppercase font-semibold text-primary text-lg'>Mens Fragrances</h1>
                    <hr className='h-[2px] bg-black/30' />

                    <div className='w-full my-5 '>
                        <Carousel opts={{
                            align: "start",
                            loop: true,
                        }}
                            plugins={[
                                Autoplay({
                                    delay: 4000,
                                }),
                            ]} className='lg:w-[95%] mb-10 mx-auto'>
                            <CarouselContent>
                                {data?.map((product) => (
                                    <CarouselItem key={product.id} className='basis-2/3 lg:basis-1/4 2xl:basis-2/6'>
                                        <ProductCard {...product} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext className='hidden lg:flex bg-primary text-white' />
                            <CarouselPrevious className='hidden lg:flex bg-primary/80 text-white' />
                        </Carousel>
                    </div>
                </div>


                {/* OTHER CATEGORIES CAROUSEL SECTION */}
                <div className='w-full mb-10'>
                    <h1 className='uppercase font-semibold text-primary text-lg'>Womens Fragrances</h1>
                    <hr className='h-[2px] bg-black/30' />

                    <div className='w-full my-5 '>
                        <Carousel opts={{
                            align: "start",
                            loop: true,
                        }}
                            plugins={[
                                Autoplay({
                                    delay: 4000,
                                }),
                                AutoScroll({
                                    direction: 'backward',
                                    speed: 1,
                                    stopOnInteraction: false
                                })
                            ]} className='lg:w-[95%] mb-10 mx-auto'>
                            <CarouselContent>
                                {vegetables?.map((product, index) => (
                                    <CarouselItem key={index} className='basis-2/3 lg:basis-1/4 2xl:basis-2/6'>

                                        <ProductCard {...product} />

                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselNext className='hidden lg:flex bg-primary text-white' />
                            <CarouselPrevious className='hidden lg:flex bg-primary/80 text-white' />
                        </Carousel>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home