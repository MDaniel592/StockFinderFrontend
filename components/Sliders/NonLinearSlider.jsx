import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import * as React from "react";


export default function NonLinearSlider({ name, defaultSliderValue, SliderValue, handleSlider, handleChange, text }) {
  function valueLabelFormat(value) {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;
    let scaledValue = value;

    while (scaledValue >= 1024 && unitIndex < units.length - 1) {
      unitIndex += 1;
      scaledValue /= 1024;
    }
    return `${scaledValue} ${units[unitIndex]}`;
  }

  function calculateValue(value) { return 2 ** value; }


  return (
    <>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left bg-zinc-700 rounded-lg hover:bg-zinc-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span className="">{name}</span>
              <ChevronUpIcon className={`${open ? "transform rotate-180" : ""} w-5 h-5 text-blue-500`} />
            </Disclosure.Button>
            <Disclosure.Panel className="text-sm">
              <div className="mx-2 mt-3">

                <div className="grid grid-cols-2 justify-between">

                  <div className="text-xxs">
                    <span className="rounded p-1 w-fit text-center bg-mui-boxes" >{valueLabelFormat(calculateValue(SliderValue[0]))}</span>
                  </div>
                  <div className="text-xs text-right">
                    <span className="rounded p-1 w-fit text-center bg-mui-boxes" >{valueLabelFormat(calculateValue(SliderValue[1]))}</span>
                  </div>
                </div>
                <Box sx={{}} className='mx-2'>
                  <Slider
                    name={name}
                    getAriaLabel={() => "Minimum distance"}
                    size="small"
                    value={SliderValue}
                    min={defaultSliderValue["min"]}
                    step={1}
                    max={defaultSliderValue["max"]}
                    scale={calculateValue}
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    onChange={handleSlider}
                    onChangeCommitted={handleChange}
                    valueLabelDisplay="off"
                    aria-labelledby="non-linear-slider"
                    disableSwap
                    sx={{
                      height: 2.5,
                      "& .MuiSlider-thumb": {
                        width: 15, height: 15, transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                        "&:before": { boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)" },
                        "&:hover": { boxShadow: `0px 0px 0px 6px` },
                      },
                      "& .MuiSlider-rail": { opacity: 0.5 },
                      "& .MuiSlider-valueLabel": { background: "#52525B", color: 'white' },
                      "& .MuiSlider-valueLabelLabel": { fontSize: 12 },
                    }}
                  />
                </Box>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
