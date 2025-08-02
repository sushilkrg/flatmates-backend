export const getServerHealth = (req, res) => {
  return res.status(200).json({ message: "Server running fine" });
};
