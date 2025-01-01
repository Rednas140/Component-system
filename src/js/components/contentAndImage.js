// document.addEventListener("DOMContentLoaded", () => {
//     const cAndIComponents = document.querySelectorAll(".c-contentAndImage");
//
//     if (cAndIComponents.length > 0){
//         cAndIComponents.forEach((component) => {
//             let textElement = component.querySelector(".c-contentAndImage-content-text");
//             let imageElement = component.querySelector(".c-contentAndImage-content-img");
//
//             console.log(textElement.clientHeight)
//             if (textElement && imageElement) {
//                 const textHeight = textElement.offsetHeight;
//                 imageElement.style.height = `${textHeight}px`;
//             }
//         })
//     }
// })