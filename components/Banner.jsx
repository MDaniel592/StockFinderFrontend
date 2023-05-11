import { Paper } from "@mui/material";
import Link from 'next/link';
import Carousel from "react-material-ui-carousel";

export default function Banner(props) {
  var items = [
    // {
    //   src: "https://img.pccomponentes.com/pcblog/1671663600000/1560x349-1.jpg",
    //   href: "https://www.awin1.com/cread.php?awinmid=20982&awinaffid=808249&campaign=&ued=https://www.pccomponentes.com/ideas-regalos-navidad",
    // },
    // {
    //   src: "/images/banners/amazon.png",
    //   href: "https://www.amazon.es/gp/prime/?tag=stockfinder09-21&linkCode=ur1&primeCampaignId=prime_assoc_ft",
    // },
    // {
    //   src: "http://thumb.pccomponentes.com/s-1127-3000/promotions/11202/banners-pcc-xgpu-legion-1127x300.jpg",
    //   href: "https://www.awin1.com/cread.php?awinmid=20982&awinaffid=808249&campaign=&ued=https://www.pccomponentes.com/legion-game-pass-mochila-gaming",
    // },
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
