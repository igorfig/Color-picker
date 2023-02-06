function rgbToHex(red, green, blue) {
  const rgb = (red << 16) | (green << 8) | (blue << 0);
  return "#" + (0x1000000 + rgb).toString(16).slice(1);
}

function rgbToHsl(red, green, blue){
  const r1 = red / 255;
  let g1 = green / 255;
  let b1 = blue / 255;

  let maxColor = Math.max(r1,g1,b1);
  let minColor = Math.min(r1,g1,b1);
  //Calculate L:
  let L = (maxColor + minColor) / 2 ;
  let S = 0;
  let H = 0;
  if(maxColor != minColor){
      //Calculate S:
      if(L < 0.5){
          S = (maxColor - minColor) / (maxColor + minColor);
      }else{
          S = (maxColor - minColor) / (2.0 - maxColor - minColor);
      }
      //Calculate H:
      if(r1 == maxColor){
          H = (g1-b1) / (maxColor - minColor);
      }else if(g1 == maxColor){
          H = 2.0 + (b1 - r1) / (maxColor - minColor);
      }else{
          H = 4.0 + (r1 - g1) / (maxColor - minColor);
      }
  }

  L = L * 100;
  S = S * 100;
  H = H * 60;

  if(H<0){
      H += 360;
  }

  let h = Number(H).toFixed();
  let s = Number(S).toFixed() + "%";
  let l = Number(L).toFixed() + "%";

  return `${h}, ${s}, ${l}`
}

function getSupportedProp(propArray) {
  const root = document.documentElement; //reference root element of document
  for (let i = 0; i < propArray.length; i++) {
    //loop through possible properties
    if (propArray[i] in root.style) {
      //if property exists on element (value will be string, empty string if not set)
      return propArray[i]; //return that string
    }
  }
}

const backgroundProp = getSupportedProp([
  "backgroundColor",
]);

const sliderRed = document.getElementById("slider-red");
const outputRed = document.getElementById("red-slider-value");

const rgbOutput = document.querySelector("#rgb-output");
const hexOutput = document.querySelector("#hexadecimal-output");
const demo = document.querySelector(".demo");

const hslOutput = document.querySelector("#hsl-output")


// Update the current slider value (each time you drag the slider handle)
sliderRed.oninput = () => {
  outputRed.innerHTML = sliderRed.value;
  rgbOutput.value = `${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value}`;

  demo.style.backgroundColor = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`;
  hexOutput.value = rgbToHex(
    sliderRed.value,
    sliderGreen.value,
    sliderBlue.value
  );

  hslOutput.value = rgbToHsl(
    sliderRed.value,
    sliderGreen.value,
    sliderBlue.value
  )
  
  sliderRed.style[backgroundProp] = `rgb(${sliderRed.value}, 0, 0)`; //set CSS backgroundColor for "input range"
};

const sliderGreen = document.querySelector("#slider-green");
const outputGreen = document.querySelector("#green-slider-value");

sliderGreen.oninput = () => {
  outputGreen.innerHTML = sliderGreen.value;
  demo.style.backgroundColor = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`
  rgbOutput.value = `${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value}`;

  hexOutput.value = rgbToHex(
    sliderRed.value,
    sliderGreen.value,
    sliderBlue.value
  );

  hslOutput.value = rgbToHsl(
    sliderRed.value,
    sliderGreen.value,
    sliderBlue.value
  )

  sliderGreen.style[backgroundProp] = `rgb(0, ${sliderGreen.value}, 0)`;
};

const sliderBlue = document.querySelector("#slider-blue");
const outputBlue = document.querySelector("#blue-slider-value");

sliderBlue.oninput = () => {
  outputBlue.innerHTML = sliderBlue.value;
  demo.style.backgroundColor = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`

  rgbOutput.value = `${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value}`;

  hexOutput.value = rgbToHex(
    sliderRed.value,
    sliderGreen.value,
    sliderBlue.value
  );

  hslOutput.value = rgbToHsl(
    sliderRed.value,
    sliderGreen.value,
    sliderBlue.value
  )

  sliderBlue.style[backgroundProp] = `rgb(0, 0, ${sliderBlue.value})`;
};


function handleRandomize() {
  sliderRed.value = Math.floor(Math.random() * 256);
  sliderGreen.value = Math.floor(Math.random() * 256);
  sliderBlue.value = Math.floor(Math.random() * 256);

  sliderRed.style[backgroundProp] = `rgb(${sliderRed.value}, 0, 0)`;
  sliderGreen.style[backgroundProp] = `rgb(0, ${sliderGreen.value},  0)`;
  sliderBlue.style[backgroundProp] = `rgb(0, 0 ,${sliderBlue.value})`;

  outputRed.innerHTML = sliderRed.value;
  outputGreen.innerHTML = sliderGreen.value;
  outputBlue.innerHTML = sliderBlue.value;

  demo.style[backgroundProp] = `rgb(${sliderRed.value}, ${sliderGreen.value}, ${sliderBlue.value})`

  hexOutput.value = rgbToHex(sliderRed.value, sliderGreen.value, sliderBlue.value).toUpperCase();
  rgbOutput.value = `${sliderRed.value}, ${sliderGreen.value}, ${sliderRed.value}`;
  hslOutput.value = rgbToHsl(sliderRed.value, sliderGreen.value, sliderBlue.value);
}


document.querySelector('.randomize-colors').addEventListener('click', handleRandomize);

rgbOutput.addEventListener("click", () => {
  rgbOutput.select();
  document.execCommand("copy");
});

hexOutput.addEventListener("click", () => {
  hexOutput.select();
  document.execCommand("copy");
});

hslOutput.addEventListener("click", () => {
  hslOutput.select();
  document.execCommand("copy");
});