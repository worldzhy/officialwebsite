export const enterAnimation = {
  initial: { transform: "translateY(50%)", opacity: 0 },
  animate: { transform: "translateY(0%)", opacity: 1 },
  transition: { duration: 0.5 },
};
export const leaveAnimation = {
  initial: { transform: "translateY(0%)", opacity: 1 },
  animate: { transform: "translateY(50%)", opacity: 0 },
  transition: { duration: 0.5 },
};
