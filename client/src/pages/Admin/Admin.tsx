import { FormEvent } from "react";
import GenericNumberInput, {
  useGenericNumberInput,
} from "../../components/GenericNumberInput";
import GenericSelect, {
  useGenericSelect,
} from "../../components/GenericSelect";
import Constants from "../constants";
import toast from "react-hot-toast";

export const Admin = () => {
  const tankVelocity = useGenericNumberInput(Constants.tankSpeedConstant);
  const bulletVelocity = useGenericNumberInput(
    Constants.projectileSpeedConstant
  );
  const refreshRate = useGenericSelect();

  const frameRateOptions = [
    { value: "16.7", label: "60fps" },
    { value: "22.22", label: "45fps" },
    { value: "33.33", label: "30fps" },
  ];

  const handleConstantsChange = (e: FormEvent) => {
    const settings = {
      tankVelocity: tankVelocity.value,
      bulletVelocity: bulletVelocity.value,
      refreshRate: refreshRate.value,
    };

    e.preventDefault();

    Constants.tankSpeedConstant = tankVelocity.value;
    Constants.projectileSpeedConstant = bulletVelocity.value;
    Constants.refreshRate = parseFloat(refreshRate.value);

    window.localStorage.setItem("gameSettings", JSON.stringify(settings));

    toast.success("Settings Saved!");
  };

  return (
    <div className="container">
      <h1>Admin</h1>
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="border rounded p-5 pt-2 w-50">
          <h2 className="mb-3">Settings</h2>
          <hr />
          <form className="form">
            <div className="row mb-5">
              <div className="col">
                <GenericNumberInput
                  controller={tankVelocity}
                  min={0}
                  max={50}
                  label="Tank Velocity"
                />
              </div>
              <div className="col">
                <GenericNumberInput
                  controller={bulletVelocity}
                  min={0}
                  max={50}
                  label="Bullet Velocity"
                />
              </div>
            </div>
            <div className="mb-5">
              <GenericSelect
                controller={refreshRate}
                label="Refresh Rate"
                options={frameRateOptions}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={(event) => handleConstantsChange(event)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
