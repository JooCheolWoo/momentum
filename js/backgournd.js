const bgImage = new Image();
const localImages = ["0.jpeg", "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"];
const aspectRatio = 16 / 9; // 원하는 이미지 비율 (가로:세로)

function setBackgroundUrl(url) {
  document.body.style.backgroundImage = `url("${url}")`;
}

function calculateImageSize() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  let imageWidth, imageHeight;

  if (screenWidth / screenHeight > aspectRatio) {
    imageWidth = Math.floor(screenHeight * aspectRatio);
    imageHeight = screenHeight;
  } else {
    imageWidth = screenWidth;
    imageHeight = Math.floor(screenWidth / aspectRatio);
  }

  return { width: imageWidth, height: imageHeight };
}

function getBackground() {
  const imageSize = calculateImageSize();

  axios({
    method: 'get',
    url: 'https://api.unsplash.com/photos/random',
    params: {
      'client_id': 'OF78VR_oR081oWZmbAKZ9sx5mdM_SUtLqdEpUvDtCpY',
      'count': '1',
      'w': imageSize.width,
      'h': imageSize.height
    }
  })
    .then(res => res.data)
    .then(data => {
      const imageUrl = data[0].urls.regular;
      bgImage.onload = () => {
        setBackgroundUrl(imageUrl);
      };
      bgImage.src = imageUrl;
    })
    .catch(error => {
      const chosenImage = localImages[Math.floor(Math.random() * localImages.length)];
      const imageUrl = `img/${chosenImage}`;
      bgImage.onload = () => {
        setBackgroundUrl(imageUrl);
      };
      bgImage.src = imageUrl;
    });
}

function adjustBackgroundSize() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const imageWidth = bgImage.width;
  const imageHeight = bgImage.height;

  if (imageWidth < screenWidth || imageHeight < screenHeight) {
    document.body.style.backgroundSize = 'cover';
  } else {
    document.body.style.backgroundSize = 'auto';
  }
}

bgImage.addEventListener('load', () => {
  adjustBackgroundSize();
});

window.addEventListener('resize', () => {
  adjustBackgroundSize();
});

getBackground();
setInterval(getBackground, 60000);
