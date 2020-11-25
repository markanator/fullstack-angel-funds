
export const getProjectFundPercentage= (current, goal)=> {
  if (goal < 1000){
    return ((current / goal) * 10).toFixed(0);
  } else if (goal > 1000 && current <=9999){
    return ((current / goal) * 100).toFixed(0);
  } else {
    return "error";
  }
}
