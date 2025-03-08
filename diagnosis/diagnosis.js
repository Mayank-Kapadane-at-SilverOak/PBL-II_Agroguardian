// Camera and diagnosis functions
document.addEventListener("DOMContentLoaded", () => {
  initCamera()
})

function initCamera() {
  const videoElement = document.getElementById("camera-preview")
  const canvasElement = document.getElementById("camera-canvas")

  if (!videoElement || !canvasElement) return

  // Check if browser supports getUserMedia
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        videoElement.srcObject = stream
      })
      .catch((error) => {
        console.error("Could not access camera: ", error)
        // Show a placeholder or error message
        videoElement.style.background = "#333"
        const cameraFrame = document.querySelector(".camera-frame p")
        if (cameraFrame) {
          cameraFrame.textContent = "Camera not available. Tap to upload an image."
        }
      })
  } else {
    console.error("getUserMedia is not supported in this browser")
    // Show a placeholder or error message
    videoElement.style.background = "#333"
    const cameraFrame = document.querySelector(".camera-frame p")
    if (cameraFrame) {
      cameraFrame.textContent = "Camera not supported. Tap to upload an image."
    }
  }
}

function diagnose() {
  // In a real app, this would capture the image and send it to an API
  // For demo purposes, we'll just navigate to the result screen

  // Capture image from video stream
  const videoElement = document.getElementById("camera-preview")
  const canvasElement = document.getElementById("camera-canvas")

  if (videoElement && canvasElement) {
    const context = canvasElement.getContext("2d")
    canvasElement.width = videoElement.videoWidth
    canvasElement.height = videoElement.videoHeight
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height)

    // Convert canvas to image data URL
    const imageDataUrl = canvasElement.toDataURL("image/jpeg")

    // Store the image in sessionStorage to display on result page
    sessionStorage.setItem("diagnosisImage", imageDataUrl)
  }

  // Navigate to result page
  window.location.href = "../diagnosis_result/diagnosis-result.html"
}