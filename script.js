function rgbToHex(red, green, blue) {
  const rgb = (red << 16) | (green << 8) | (blue << 0);
  return "#" + (0x1000000 + rgb).toString(16).slice(1);
}

function getSupportedProp(proparray) {
  const root = document.documentElement; //reference root element of document
  for (let i = 0; i < proparray.length; i++) {
    //loop through possible properties
    if (proparray[i] in root.style) {
      //if property exists on element (value will be string, empty string if not set)
      return proparray[i]; //return that string
    }
  }
}

const backgroundProp = getSupportedProp([
  "backgroundColor",
]);

const sliderRed = document.getElementById("slider-red");
const outputRed = document.getElementById("red-field");

const rgbOutput = document.querySelector("#rgb-output");
const hexOutput = document.querySelector("#hexadecimal-output");
const demo = document.querySelector(".demo");

// Update the current slider value (each time you drag the slider handle)
sliderRed.oninput = () => {
  outputRed.innerHTML = sliderRed.value;
  rgbOutput.value = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`;
  demo.style.backgroundColor = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`;
  hexOutput.value = rgbToHex(
    sliderRed.value,
    sliderGreen.value,
    sliderBlue.value
  );
  sliderRed.style[backgroundProp] = `rgb(${sliderRed.value}, 0, 0)`; //set CSS backgroundColor for "input range"
};

const sliderGreen = document.querySelector("#slider-green");
const outputGreen = document.querySelector("#green-field");

sliderGreen.oninput = () => {
  outputGreen.innerHTML = sliderGreen.value;
  demo.style.backgroundColor = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`
  rgbOutput.value = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`;

  hexOutput.value = rgbToHex(
    sliderRed.value,
    sliderGreen.value,
    sliderBlue.value
  );
  sliderGreen.style[backgroundProp] = `rgb(0, ${sliderGreen.value}, 0)`;
};

const sliderBlue = document.querySelector("#slider-blue");
const outputBlue = document.querySelector("#blue-field");

sliderBlue.oninput = () => {
  outputBlue.innerHTML = sliderBlue.value;
  demo.style.backgroundColor = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`

  rgbOutput.value = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`;

  hexOutput.value = rgbToHex(
    sliderRed.value,
    sliderGreen.value,
    sliderBlue.value
  );
  sliderBlue.style[backgroundProp] = `rgb(0, 0, ${sliderBlue.value})`;
};


rgbOutput.addEventListener("click", () => {
  rgbOutput.select();
  document.execCommand("copy");
});

hexOutput.addEventListener("click", () => {
  hexOutput.select();
  document.execCommand("copy");
});