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
  // const { projectid, name, done } = req.body;
  try {
    // const updatedTask = await Task.update(
    //   { name, done, projectid },
    //   { where: { id } }
    // );

    const task = await Address.findOne({
      attributes: ["name", "projectId", "done", "id"],
      where: { id },
    });

    task.set(req.body);

    await task.save();

    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteAddress(req, res) {
  const { id } = req.params;
  try {
    await Address.destroy({
      where: { id },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
