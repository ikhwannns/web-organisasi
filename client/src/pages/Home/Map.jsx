import styles from "./Map.module.css";

const Map = () => {
  return (
    <iframe
      className={`${styles.mapImg} px-3 lg:px-0`}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31790.45819917527!2d119.4368051176009!3d-5.134713976122635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbefcb70a4fef89%3A0x4427b765b3d16a6f!2sFakultas%20Ekonomi%20dan%20Bisnis%20Universitas%20Hasanuddin!5e0!3m2!1sid!2sid"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default Map;
