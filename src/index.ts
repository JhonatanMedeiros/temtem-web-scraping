import Robot from './crawler/robot';

const robot: Robot = new Robot({ useDataBase: true, saveOnFile: false });

robot.start();
