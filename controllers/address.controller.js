import { Address } from "../models/Address.js";

export async function addAddress(req, res) {
  try {
    const address = new Address({
      userId: req.body.userId,
      address: req.body.address,
    });
    await address.save();
    return res.status(201).json(address);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
}

export async function getAddresses(req, res) {
  try {
    const tasks = await Address.findAll({
      attributes: ["id", "projectId", "name", "done"],
      order: [["id", "DESC"]],
    });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateAddress(req, res) {
  const { id } = req.params;
  const { userId } = req.params;
  const data = req.body;

  if (userId !== req.user.id.toString()) {
    return res.status(403).json("unauthorized access!");
  };

  try {
    const address = await Address.findByPk(id);
    if (!address) {
      return res.status(404).json("Address not found");
    }
    const updatedAddress = await address.update(data);
    return res.status(200).json(updatedAddress);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAddress(req, res) {
  const { id } = req.params;
  const { userId } = req.params;
  if (userId !== req.user.id) {
    return res.status(403).json("unauthorized access!");
  }
  try {
    await Address.destroy({ where: { id: id } });

    return res.status(200).json;
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getAddress(req, res) {
  const { id } = req.params;
  try {
    const address = await Address.findOne({ where: { id: id } });
    return res.status(200).json(address);
  } catch (error) {
    return res.status(500).json(error);
  }
}
