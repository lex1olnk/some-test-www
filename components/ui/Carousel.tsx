"use client";

import React, { useRef, useState } from "react";
import { Card } from "./Card"; // Импортируйте ваш компонент Card
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Book } from "@prisma/client";

export const Carousel = ({
  books,
  sliderCount,
  space,
}: {
  books: Book[];
  sliderCount: number;
  space: number;
}) => {
  return (
    <Swiper
      spaceBetween={space}
      slidesPerView={sliderCount}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className="h-full"
    >
      {books.map((book) => (
        <SwiperSlide key={book.id}>
          <Card title={book.name} bookId={book.id} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
