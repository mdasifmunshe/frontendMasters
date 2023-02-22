import prisma from '../db';

// GET all
export const getProducts = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.user.id,
		},
		include: {
			Product: true,
		},
	});

	res.json({ data: user.Product });
};

// GET one
export const getOneProduct = async (req, res) => {
	const id = req.params.id;
	const product = await prisma.product.findFirst({
		where: {
			id,
			belongsToId: req.user.id,
		},
	});

	res.json({ data: product });
};

// POST
export const createProduct = async (req, res, next) => {
	try {
		const product = await prisma.product.create({
			data: {
				name: req.body.name,
				belongsToId: req.user.id,
			},
		});

		res.json({ data: product });
	} catch (error) {
		next(error);
	}
};

// UPDATE
export const updateProduct = async (req, res) => {
	const id = req.params.id;
	const updated = await prisma.product.update({
		where: {
			id_belongsToId: {
				id,
				belongsToId: req.user.id,
			},
		},
		data: {
			name: req.body.name,
		},
	});

	res.json({ data: updated });
};

// DELETE
export const deleteProduct = async (req, res) => {
	const id = req.params.id;
	const deleted = await prisma.product.delete({
		where: {
			id_belongsToId: {
				id,
				belongsToId: req.user.id,
			},
		},
	});

	res.json({ data: deleted });
};
