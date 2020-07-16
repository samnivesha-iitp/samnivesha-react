import AdminWorker from "./adminWebWorker";

const worker = new Worker(AdminWorker);
export default worker;
