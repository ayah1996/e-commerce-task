let products = JSON.parse(localStorage.getItem("products"));

if (!products) {
  products = [
    {
      product_id: 1,
      product_name: "AirPods",
      product_price: "50",
      product_desc: `AirPods are a type of wireless earbuds designed by Apple that connect to devices such as iPhones, iPads, and Macs via Bluetooth. They offer a range of features, including high-quality audio playback, built-in microphones for making calls and using Siri voice assistant, and sensors that automatically pause playback when removed from the ears. `,
      product_image: "/images/airpod.jpg",
      added_to_cart: true,
    },
    {
      product_id: 2,
      product_name: "Android Watch",
      product_price: "60",
      product_desc: ` An Android watch is a wearable device that connects to a
    smartphone via Bluetooth, allowing users to access various
    features directly from their wrist, including receiving
    notifications, making calls, tracking fitness activities, and
    accessing apps.`,
      product_image: "/images/android-watch.jpg",
      added_to_cart: false,
    },
    {
      product_id: 3,
      product_name: "Smart Watch",
      product_price: "40",
      product_desc: `A smart touch watch is a type of wearable device that features a touchscreen display and offers various features, such as notifications, calls, messaging, fitness tracking, music control, and access to apps. It can be connected to a smartphone via Bluetooth and can be customized with different watch faces and bands.`,
      product_image: "/images/black-watch.jpg",
      added_to_cart: false,
    },
    {
      product_id: 4,
      product_name: "Sony headphones",
      product_price: "20",
      product_desc: `Sony headphones are a type of wireless or wired headphones designed by Sony that offer high-quality audio playback and noise-cancellation features to reduce external noise for a better listening experience. They come in various styles, including over-ear, on-ear, and in-ear, and are compatible with a range of devices, including smartphones, computers, and gaming consoles.`,
      product_image: "/images/sony-headphone.jpg",
      added_to_cart: true,
    },
    {
      product_id: 5,
      product_name: "Usb",
      product_price: "10",
      product_desc: `USB (Universal Serial Bus) is a common type of data transfer standard used to connect electronic devices, such as computers, smartphones, cameras, printers, and external hard drives. It allows for the transfer of data, power, and signals between devices and can support various types of data transfer speeds, including USB 2.0, USB 3.0, and USB 3.1. USB cables and connectors come in various sizes and shapes, such as Type-A, Type-B, Type-C, and Mini-USB, to fit different devices and applications.`,
      product_image: "/images/usb.jpg",
      added_to_cart: false,
    },
    {
      product_id: 6,
      product_name: "Smart Touch Watch",
      product_price: "30",
      product_desc: `A smart touch watch is a type of wearable device that features a touchscreen display and offers various features, such as notifications, calls, messaging, fitness tracking, music control, and access to apps. It can be connected to a smartphone via Bluetooth and can be customized with different watch faces and bands.`,
      product_image: "/images/watch.jpg",
      added_to_cart: false,
    },
  ];

  localStorage.setItem("products", JSON.stringify(products)); // Save products to Local Storage
}
