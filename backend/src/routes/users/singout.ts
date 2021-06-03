import express from "express";
const router = express.Router();

router.post("/api/users/signout", async (req, res) => {
	req.user = undefined;
	res.send({ message: "Signout successfully" });
  res.send({});
});

export { router as signOutRouter };
