import axios from 'axios';

const DEFAULT_IMAGE = '/images/default-hackathon.jpg'; // Add a default hackathon image

export const fetchHackathons = async (platform) => {
  try {
    switch (platform) {
      case 'Unstop':
        return await fetchUnstopHackathons();
      case 'Devpost':
        return await fetchDevpostHackathons();
      case 'Devfolio':
        return await fetchDevfolioHackathons();
      default:
        return [];
    }
  } catch (error) {
    console.error(`Error fetching ${platform} hackathons:`, error);
    return [];
  }
};

const fetchUnstopHackathons = async () => {
  try {
    const response = await axios.get(
      '/api/unstop/public/opportunity/search-result?opportunity=hackathons&per_page=15&oppstatus=open&usertype=students'
    );
    console.log("Unstop hackathons:", response.data.data.data);

    return response.data.data.data.map(hackathon => ({
      id: hackathon.id,
      title: hackathon.title,
      description: hackathon.seo_details?.[0]?.description || 'No description available',
      organizer: hackathon.organisation?.name || 'Unknown Organization',
      startDate: new Date(hackathon.start_date).toLocaleDateString(),
      endDate: new Date(hackathon.end_date).toLocaleDateString(),
      registrationDeadline: new Date(hackathon.regnRequirements?.end_regn_dt).toLocaleDateString(),
      remainingTime: hackathon.regnRequirements?.remain_days || 'Registration ended',
      teamSize: {
        min: hackathon.festival?.regnRequirements?.min_team_size || 1,
        max: hackathon.festival?.regnRequirements?.max_team_size || 1
      },
      prizes: hackathon.prizes.map(prize => ({
        rank: prize.rank,
        amount: prize.cash ? `₹${prize.cash}` : 'Not specified',
        details: prize.others || ''
      })),
      eligibility: hackathon.filters
        .filter(filter => filter.type === 'eligible')
        .map(filter => filter.name),
      categories: hackathon.filters
        .filter(filter => filter.type === 'category')
        .map(filter => filter.name),
      platform: 'Unstop',
      mode: hackathon.region || 'Not specified',
      thumbnail: hackathon.banner_mobile?.image_url || 
                hackathon.logoUrl2 || 
                DEFAULT_IMAGE,
      url: hackathon.seo_url,
      eventDetails: {
        viewCount: hackathon.viewsCount,
        registerCount: hackathon.registerCount,
        isPaid: hackathon.isPaid,
        status: hackathon.status,
        festivalName: hackathon.festival?.name || null
      },
      applicationStatus: {
        isOpen: hackathon.regn_open === 1,
        status: hackathon.regnRequirements?.reg_status || 'UNKNOWN'
      }
    }));
  } catch (error) {
    console.error('Error fetching Unstop hackathons:', error);
    return [];
  }
};

const fetchDevpostHackathons = async () => {
  try {
    const response = await axios.get(
      '/api/devpost/hackathons?challenge_type[]=online&status[]=upcoming&status[]=open'
    );

    return response.data.hackathons.map(hackathon => ({
      id: hackathon.id,
      title: hackathon.title,
      description: hackathon.description_preview || 'No description available',
      startDate: hackathon.submission_period_starts_at,
      endDate: hackathon.submission_period_ends_at,
      prize: hackathon.prize_amount ? `$${hackathon.prize_amount}` : 'Not specified',
      status: getHackathonStatus(
        hackathon.submission_period_starts_at,
        hackathon.submission_period_ends_at
      ),
      platform: 'Devpost',
      thumbnail: hackathon.thumbnail_url || DEFAULT_IMAGE,
      url: hackathon.url
    }));
  } catch (error) {
    console.error('Error fetching Devpost hackathons:', error);
    return [];
  }
};

const fetchDevfolioHackathons = async () => {
  try {
    const response = await axios.post('/api/devfolio/search/hackathons', {}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Map the hits array from the response
    const hackathons = response.data.hits.map(({ _source: hackathon }) => ({
      id: hackathon.uuid,
      title: hackathon.name,
      description: hackathon.desc || hackathon.tagline || 'No description available',
      organizer: hackathon.hosted_by || 'Unknown Organization',
      startDate: new Date(hackathon.start_date).toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
}) + " " + new Date(hackathon.start_date).toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
}),

endDate: new Date(hackathon.end_date).toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
}) + " " + new Date(hackathon.end_date).toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
}),

registrationDeadline: new Date(
  hackathon.regnRequirements?.end_regn_dt
).toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
}) + " " + new Date(
  hackathon.regnRequirements?.end_regn_dt
).toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "2-digit",
}),
      remainingTime: getRemainingTime(hackathon.hackathon_setting?.reg_ends_at),
      teamSize: {
        min: 1,
        max: 4
      },
      prizes: hackathon.prizes?.map(prize => ({
        rank: prize.name || '',
        amount: prize.desc || 'Not specified',
        details: prize.desc || ''
      })) || [],
      eligibility: [],
      categories: [],
      platform: 'Devfolio',
      mode: hackathon.is_online ? 'Online' : 'Offline',
      thumbnail: hackathon.cover_img || 
                hackathon.hackathon_setting?.logo || 
                DEFAULT_IMAGE,
      url: `https://devfolio.co/hackathons/${hackathon.slug}`,
      eventDetails: {
        viewCount: 0,
        registerCount: hackathon.participants_count || 0,
        isPaid: false,
        status: hackathon.status?.toUpperCase() || 'UNKNOWN',
        location: hackathon.location || 'Not specified',
        city: hackathon.city || 'Not specified',
        state: hackathon.state || 'Not specified',
        country: hackathon.country || 'Not specified'
      },
      applicationStatus: {
        isOpen: isRegistrationOpen(
          hackathon.hackathon_setting?.reg_starts_at,
          hackathon.hackathon_setting?.reg_ends_at
        ),
        status: getHackathonStatus(hackathon.starts_at, hackathon.ends_at)
      },
      socialLinks: {
        website: hackathon.hackathon_setting?.site || null,
        facebook: hackathon.hackathon_setting?.facebook || null,
        instagram: hackathon.hackathon_setting?.instagram || null,
        linkedin: hackathon.hackathon_setting?.linkedin || null,
        twitter: hackathon.hackathon_setting?.twitter || null,
        discord: hackathon.hackathon_setting?.discord || null
      }
    }));

    console.log("Mapped Devfolio hackathons:", hackathons);
    return hackathons;

  } catch (error) {
    console.error('Error fetching Devfolio hackathons:', error);
    return [];
  }
};

// Helper function to check if registration is open
const isRegistrationOpen = (startDate, endDate) => {
  if (!startDate || !endDate) return false;
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  return now >= start && now <= end;
};

// Helper function to get remaining time
const getRemainingTime = (endDate) => {
  if (!endDate) return 'Registration ended';
  const now = new Date();
  const end = new Date(endDate);
  
  if (now > end) return 'Registration ended';
  
  const days = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  return `${days} days left`;
};

const getHackathonStatus = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return 'Upcoming';
  if (now > end) return 'Completed';
  return 'Ongoing';
};