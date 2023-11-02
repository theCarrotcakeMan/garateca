import type { NextApiRequest, NextApiResponse } from 'next';

import initConn from 'src/lib/db';
import EmployeeRole from 'model/role';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {

  await initConn();

  const employeeRoles = await EmployeeRole
                                .find({})
                                .lean();
  return res.json(employeeRoles);

}
