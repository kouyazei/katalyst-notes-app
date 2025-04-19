export async function GET({ params, fetch }) {
  try {
    const path = params.path;
    const response = await fetch(`https://api.github.com/repos/kouyazei/katalyst-notes/contents/${path}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.content) {
      // Remove line breaks from base64 string before decoding
      const cleanContent = data.content.replace(/\n/g, '');
      try {
        const decoded = atob(cleanContent);
        // Convert to UTF-8 string
        const content = decodeURIComponent(escape(decoded));
        data.content = content;
      } catch (e) {
        console.error('Error decoding content:', e);
        data.content = 'Error: Could not decode content.';
      }
    }
    
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return new Response(JSON.stringify({ content: 'Error: Failed to load content.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}