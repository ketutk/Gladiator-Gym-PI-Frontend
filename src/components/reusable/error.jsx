const AlertError = ({ error, font, layer }) => {
  return (
    <div class={`${layer ? layer : "p-4 mb-4 "} text-red-800 rounded-lg bg-red-50`} role="alert">
      <span class={`${font ? font : "font-medium text-sm"}`}>{error}</span>
    </div>
  );
};

export default AlertError;
