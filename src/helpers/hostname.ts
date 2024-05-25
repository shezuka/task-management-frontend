export const getBackendHostname = () => {
  return (
    process.env.BACKEND_HOSTNAME ?? process.env.NEXT_PUBLIC_BACKEND_HOSTNAME
  );
};
