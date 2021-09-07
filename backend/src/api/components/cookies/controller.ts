
export async function getShorts(req: any, res: any) {
  try {

  } catch (e) {
    res.status(500).send({
      message: "An error occurred and we were unable to retrieve your URLs!",
      isSuccess: false,
      error: e
    })
  }
}