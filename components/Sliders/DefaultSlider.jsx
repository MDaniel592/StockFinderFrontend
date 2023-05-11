import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React from 'react';

export default function DefaultSlider({ name, defaultSliderValue, SliderValue, handleSlider, handleChange, text, step = 1 }) {
  function valueLabelFormat(value) {
    return `${value}${text}`;
  }

  // if (step === 'custom') step = SliderValue[1] > 1000 ? 100 : 50;


  const handleValueChange = (input) => (changeEvent) => {

    let newValue = changeEvent.target.value == '' ? 0 : parseInt(changeEvent.target.value)
    let secondValue = 0
    switch (input) {
      case 'min':
        secondValue = SliderValue[1] > newValue ? SliderValue[1] : newValue
        handleSlider('Change', [newValue, secondValue], 0)
        handleChange('Change', [newValue, secondValue])
        return
      case 'max':
        secondValue = SliderValue[0] < newValue ? SliderValue[0] : newValue
        handleSlider('Change', [secondValue, newValue], 1)
        handleChange('Change', [secondValue, newValue])
        return
      default:
        return
    }
  };


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
              <div className="m-2">

                <div className="grid grid-cols-2 justify-between">

                  <div className="text-xxs">
                    <input className="rounded py-1 px-2 leading-tight w-14 text-center" type="number" min='0' max={SliderValue[1]} value={SliderValue[0]} onChange={handleValueChange('min')} />
                  </div>
                  <div className="text-xs text-right">
                    <input className="rounded py-1 px-2 leading-tight w-14 text-center" type="number" min={SliderValue[0]} max={defaultSliderValue['max']} value={SliderValue[1]} onChange={handleValueChange('max')} />
                  </div>
                </div>

                <Box sx={{}} className='mx-2'>
                  <Slider
                    name={name}
                    getAriaLabel={() => "Minimum distance"}
                    size="small"
                    value={SliderValue}
                    onChange={handleSlider}
                    onChangeCommitted={handleChange}
                    valueLabelDisplay="off"
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    min={defaultSliderValue["min"]}
                    step={1}
                    max={defaultSliderValue["max"]}
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
