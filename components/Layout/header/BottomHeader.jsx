import GPUCategory from "../../Dropdown/GPUCategory";
import GPUStock from "../../Dropdown/GPUStock";
import { generations, solutions } from "./GPUdata";
import PCBuilder from "./PCBuilder";

export default function BottomHeader({ }) {
  return (
    <div className="relative flex justify-center items-center lg:justify-start h-10">
      <PCBuilder />
      <GPUStock generations={generations} />
      <GPUCategory title="Mostrar componentes" data_grid={solutions} img="/images/svg/chip.svg" />
      {/* <TelegramChannelsList telegram_channels={telegram_channels} /> */}
    </div>
  );
}
