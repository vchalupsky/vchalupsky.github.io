const posts = [
  {id:1,title:'Welcome to the Simple Blog',date:'2026-03-02',tags:['intro','site'],excerpt:'This is a minimal blog demo built with plain HTML, CSS and JavaScript.',content:`
<p>This small demo shows how you can build a static blog without a framework. It renders posts from a JavaScript array, supports searching and tag filtering.</p>
<p>Feel free to edit <code>js/script.js</code> to add your own posts.</p>`},
  {id:2,title:'Design Tips for Small Sites',date:'2026-02-10',tags:['design','css'],excerpt:'Small sites benefit from careful typography and spacing.',content:`
<p>Keep styles simple, use consistent spacing, and focus on readable typography. Use system fonts for speed.</p>`},
  {id:3,title:'JavaScript Rendering Basics',date:'2026-01-05',tags:['javascript'],excerpt:'Render HTML from data and attach event handlers.',content:`
<p>Use DocumentFragments and event delegation for efficient rendering on larger lists.</p>`}
];

const postsEl = document.getElementById('posts');
const searchEl = document.getElementById('search');

function render(list){
  postsEl.innerHTML = '';
  if(!list.length){postsEl.innerHTML='<p class="muted">No posts found.</p>';return}
  list.forEach(p=>{
    const el = document.createElement('article'); el.className='post';
    el.innerHTML = `
      <h2>${p.title}</h2>
      <div class="meta">${p.date}</div>
      <div class="excerpt">${p.excerpt}</div>
      <div class="tags">${p.tags.map(t=>`<button class="tag" data-tag="${t}">${t}</button>`).join('')}</div>
      <div class="actions"><button class="btn" data-id="${p.id}">Read more</button></div>
      <div class="full" data-full-id="${p.id}" style="display:none">${p.content}</div>
    `;
    postsEl.appendChild(el);
  })
}

function filter(q){
  q = (q||'').trim().toLowerCase();
  if(!q) return posts;
  return posts.filter(p=>{
    return p.title.toLowerCase().includes(q)||p.excerpt.toLowerCase().includes(q)||p.content.toLowerCase().includes(q)||p.tags.join(' ').toLowerCase().includes(q)
  })
}

postsEl.addEventListener('click',e=>{
  if(e.target.matches('.btn')){
    const id = e.target.dataset.id; const full = document.querySelector(`[data-full-id="${id}"]`);
    if(full){ full.style.display = full.style.display === 'none' ? 'block' : 'none'; e.target.textContent = full.style.display==='block' ? 'Hide' : 'Read more'; }
  }
  if(e.target.matches('.tag')){
    const tag = e.target.dataset.tag; searchEl.value = tag; render(filter(tag));
  }
});

searchEl.addEventListener('input',()=>{ render(filter(searchEl.value)); });

// initial render
render(posts);
