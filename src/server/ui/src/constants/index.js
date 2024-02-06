export const navLinks = [
    {
      id: "camera",
      title: "Camera",
    },
    {
      id: "timeline",
      title: "Timeline",
    },
  ];
  
  export const currDate = new Date().toLocaleDateString();
  
  export const currTime = new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1');;
  