export const prerender = false;

export async function load({ fetch, params }) {
  try {
    const path = params.path;
    
    // Fetch the directory structure for the sidebar
    const treeResponse = await fetch('/api/github/tree');
    const tree = await treeResponse.json();
    
    // Fetch the content for the current path
    const response = await fetch(`/api/github/${path}`);
    const data = await response.json();

    return {
      content: data.content || 'Error: No content available.',
      tree: tree.filter(item => item.type === 'file' && item.name.endsWith('.md'))
    };
  } catch (error) {
    console.error('Error loading data:', error);
    return {
      content: 'Error: Failed to load content.',
      tree: []
    };
  }
}