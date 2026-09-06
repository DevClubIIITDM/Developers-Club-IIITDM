import Admin from '../../models/admin';
import dbConnect from '../conn';

// GET request: Fetch all admins
export async function GET(req) {
  try {
    await dbConnect();

    const admins = await Admin.find();

    return new Response(
      JSON.stringify({
        success: true,
        data: admins,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error fetching admins:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch admins',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}