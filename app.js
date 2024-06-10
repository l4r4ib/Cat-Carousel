const track = document.getElementById("image-track");

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = e => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.style.transform = `translate(${nextPercentage}%, -50%)`;

  for (const image of track.getElementsByClassName("image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`;
  }
};

// Handle mouse events
window.onmousedown = e => handleOnDown(e);
window.onmouseup = () => handleOnUp();
window.onmousemove = e => handleOnMove(e);

// Handle touch events
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.ontouchend = () => handleOnUp();
window.ontouchmove = e => handleOnMove(e.touches[0]);

// Double-click to expand the image
const images = document.querySelectorAll("#image-track .image");

images.forEach(image => {
  image.ondblclick = () => {
    if (image.classList.contains("expanded")) {
      image.classList.remove("expanded");
      track.classList.remove("bottom");
    } else {
      document.querySelectorAll(".image.expanded").forEach(img => img.classList.remove("expanded"));
      image.classList.add("expanded");
      track.classList.add("bottom");
    }
  };
});
