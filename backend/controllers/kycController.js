const prisma = require('../lib/prisma');

const REQUIRED_FIELDS = ['clientName', 'clientEmail', 'documentType', 'documentNumber', 'country'];

function ok(res, data, message = 'Success', status = 200) {
  return res.status(status).json({ success: true, data, message });
}

function fail(res, message, status = 400) {
  return res.status(status).json({ success: false, data: null, message });
}

// GET /api/kyc_submissions
async function getAll(req, res) {
  try {
    const submissions = await prisma.kycSubmission.findMany({
      orderBy: { submittedAt: 'desc' },
      include: {
        reviewer: { select: { id: true, name: true } },
      },
    });
    return ok(res, submissions);
  } catch (err) {
    console.error('getAll error:', err);
    return fail(res, 'Database error, please try again', 500);
  }
}

// POST /api/kyc_submissions
async function create(req, res) {
  const { clientName, clientEmail, documentType, documentNumber, country, status, rejectionReason, reviewedBy } = req.body;

  for (const field of REQUIRED_FIELDS) {
    if (!req.body[field]) {
      return fail(res, `Field ${field} is required`);
    }
  }

  try {
    const submission = await prisma.kycSubmission.create({
      data: {
        clientName,
        clientEmail,
        documentType,
        documentNumber,
        country,
        ...(status && { status }),
        ...(rejectionReason && { rejectionReason }),
        ...(reviewedBy && { reviewedBy }),
      },
    });
    return ok(res, submission, 'Submission created', 201);
  } catch (err) {
    console.error('create error:', err);
    return fail(res, 'Database error, please try again', 500);
  }
}

// PUT /api/kyc_submissions/:id
async function update(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return fail(res, 'Invalid id');

  const { clientName, clientEmail, documentType, documentNumber, country, status, rejectionReason, reviewedBy, reviewedAt } = req.body;

  try {
    const existing = await prisma.kycSubmission.findUnique({ where: { id } });
    if (!existing) return fail(res, 'Record not found', 404);

    const updated = await prisma.kycSubmission.update({
      where: { id },
      data: {
        ...(clientName && { clientName }),
        ...(clientEmail && { clientEmail }),
        ...(documentType && { documentType }),
        ...(documentNumber && { documentNumber }),
        ...(country && { country }),
        ...(status && { status }),
        ...(rejectionReason !== undefined && { rejectionReason }),
        ...(reviewedBy !== undefined && { reviewedBy }),
        ...(reviewedAt !== undefined && { reviewedAt: reviewedAt ? new Date(reviewedAt) : null }),
      },
    });
    return ok(res, updated, 'Submission updated');
  } catch (err) {
    console.error('update error:', err);
    return fail(res, 'Database error, please try again', 500);
  }
}

// DELETE /api/kyc_submissions/:id
async function remove(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return fail(res, 'Invalid id');

  try {
    const existing = await prisma.kycSubmission.findUnique({ where: { id } });
    if (!existing) return fail(res, 'Record not found', 404);

    await prisma.kycSubmission.delete({ where: { id } });
    return ok(res, null, 'Submission deleted');
  } catch (err) {
    console.error('remove error:', err);
    return fail(res, 'Database error, please try again', 500);
  }
}

module.exports = { getAll, create, update, remove };
