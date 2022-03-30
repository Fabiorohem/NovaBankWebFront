export default function setHeaders(headers) 
{
    
if (typeof window !== 'undefined') {
	const token = localStorage.getItem('novabank.token');
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	} 
    }
}