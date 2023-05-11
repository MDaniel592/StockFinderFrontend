import * as React from "react";
import DefaultSlider from "../Sliders/DefaultSlider.jsx";
import NonLinearSlider from "../Sliders/NonLinearSlider.jsx";
import SidebarList from "./SidebarList.jsx";

export default function Sidebar({ data_list, data_slider }) {
  var html_code;

  for (let item in data_slider) {

    if (data_slider[item]["type"] === "scaled") {
      let list = (
        <div key={data_slider[item]["name"]} className="sidebar-div">
          <NonLinearSlider
            name={data_slider[item]["name"]}
            SliderValue={data_slider[item]["SliderValue"]}
            defaultSliderValue={data_slider[item]["defaultSliderValue"]}
            handleSlider={data_slider[item]["handleSlider"]}
            handleChange={data_slider[item]["handleChange"]}
            text={data_slider[item]["text"]}
          />
        </div>
      );
      html_code = [html_code, list];
      continue
    }

    let list = (
      <div key={data_slider[item]["name"]} className="sidebar-div">
        <DefaultSlider
          name={data_slider[item]["name"]}
          SliderValue={data_slider[item]["SliderValue"]}
          defaultSliderValue={data_slider[item]["defaultSliderValue"]}
          handleSlider={data_slider[item]["handleSlider"]}
          handleChange={data_slider[item]["handleChange"]}
          text={data_slider[item]["text"]}
          step={data_slider[item]["step"]}
        />
      </div>
    );
    html_code = [html_code, list];
  }

  for (let item in data_list) {
    let list = (
      <div key={data_list[item]["name"]} className="sidebar-div">
        <SidebarList
          name={data_list[item]["name"]}
          data={data_list[item]["data"]}
          preferences={data_list[item]["preferences"]}
          handleChange={data_list[item]["handleChange"]}
          handleButton={data_list[item]["handleButton"]}
          button={data_list[item]["button"]}
          show_more={data_list[item]["show_more"]}
        />
      </div>
    );

    html_code = [html_code, list];
  }

  return <>{html_code}</>;
}
