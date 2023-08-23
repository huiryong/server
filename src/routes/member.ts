import { Router } from "express";
import Member from "../entities/Member";

const createMember = async (req, res) => {
  const { katakanaName, email } = req.body;
  console.log("katakanaName==" + katakanaName);
  console.log("email==" + email);

  //   const katakanaName = req.body.katakanaName;
  //   const email = req.body.email;

  try {
    const member = new Member();
    member.katakanaName = katakanaName;
    member.email = email;

    await member.save(); // 4000
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "エラーが発生しました。" });
  }
};

const getMember = async (req, res) => {
  try {
    const members = await Member.find({
      order: {
        id: "ASC",
      },
    });
    return res.json(members);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "エラーが発生しました。" });
  }
};

const updateMember = async (req, res) => {
  //
  const katakanaName = req.body.katakanaName;
  const email = req.body.email;

  //
  const memberId = req.params.memberId;
  try {
    const member = await Member.findOne({
      where: {
        id: Number(memberId),
      },
    });

    member.email = email;
    member.katakanaName = katakanaName;

    await member.save();
    return res.json(member);
  } catch (error) {}
};

const deleteMember = async (req, res) => {
  const memberId = req.params.memberId;
  console.log(memberId);

  try {
    const member = await Member.findOne({
      where: {
        id: memberId,
      },
    });

    await member.remove();

    return res.json(member);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "エラーが発生しました。",
    });
  }
};

const getMemberDetail = async (req, res) => {
  const memberId = req.params.memberId;

  try {
    const member = await Member.findOne({
      where: {
        id: memberId,
      },
    });
    return res.json(member);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "エラーが発生しました。",
    });
  }
};

const router = Router();
router.post("/create", createMember);
router.get("/list", getMember);
router.get("/detail/:memberId", getMemberDetail);

router.patch("/update/:memberId", updateMember);
router.delete("/delete/:memberId", deleteMember);

export default router;
