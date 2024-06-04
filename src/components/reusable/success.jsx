const AlertSuccess = ({ success, font, layer }) => {
  return (
    <div class={`${layer ? layer : "p-4 mb-4 "} text-green-800 rounded-lg bg-green-100`} role="alert">
      <span class={`${font ? font : "font-medium text-sm"}`}>{success}</span>
    </div>
  );
};

export default AlertSuccess;
