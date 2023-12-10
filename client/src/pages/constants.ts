const Constants = {
  // World variables
  refreshRate: 16.7,
  boundaryWidth: window.innerWidth * 0.8,
  boundaryHeight: window.innerHeight * 0.8,

  // Tank variables
  tankSpeedConstant: 1.5,
  barrelRotationRate: 1,
  tankProximity: 45,
  tankWidth: 50,
  tankHeight: 75,

  // Projectile variables
  projectileSpeedConstant: 5,
  projectileWidth: 8,
  projectileHeight: 16,
};

export const enum MessageTypes {
  General,
  AddVehicle,
  VehicleState,
  UpdateVehicle,
}

export const enum GameState {
  Joining = "Joining",
  Playing = "Playing",
  Ended = "Ended",
}

export default Constants;
