import { Paper } from "@mui/material";
import Link from 'next/link';
import Carousel from "react-material-ui-carousel";

export default function Banner(props) {
  var items = [
    {
      src: "/images/banners/amazon-prime.png",
      href: "https://www.amazon.es/?tag=stockfinder09-21&linkCode=ur1",
    },
  ];

  return (
    <section className="max-h-40">
      <Carousel
        indicatorContainerProps={{ style: { marginTop: "-30px", visibility: "hidden" } }}
        stopAutoPlayOnHover={false}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </section>
  );
}

function Item(props) {
  return (
    <div className="mx-auto px-4 py-3">
      <div className="flex items-center justify-center ">
        <Link href={props.item.href}>
          <Paper className="rounded-lg max-h-24 sm:max-h-64">
            <img src={props.item.src} className="rounded-lg object-cover max-h-32 w-auto"></img>
          </Paper>
        </Link>
      </div>
    </div>
  );
}
