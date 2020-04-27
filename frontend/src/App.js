import React, { useState, useEffect } from 'react';
import './App.css';


const App = () => {

  const [comments, updateComments] = useState([])
  let [user, setUser] = useState('')
  let [post, setPost] = useState('')
  let [posted, setPosted] = useState(false)

  const postFormValue = e => {
    e.preventDefault()

    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({user, post})
    }).then(res => {
      if(res.status === 200) setPosted(!posted)
    })

    setUser(user = "")
    setPost(post = "")
  }

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(res => res.json())
      .then(data => updateComments([...data]))
  }, [posted])


  return (
    <div>
      <h1>About WILD CODE SCHOOL</h1>
      <p>
        Bacon ipsum dolor amet spare ribs bresaola jowl, meatloaf turkey pork chop rump pork belly. Short loin beef ribs flank beef porchetta t-bone biltong drumstick ham hock tail chuck salami pork belly fatback hamburger. Flank strip steak doner, ham bacon pig corned beef salami bresaola beef shoulder. Kevin drumstick frankfurter, ground round sirloin picanha prosciutto pig ham hock rump meatloaf chislic.
    </p>
      <p>
        Swine meatloaf shank spare ribs picanha porchetta chuck, beef ribs capicola kielbasa pork. Turkey cow tail, short loin ham hock shank filet mignon porchetta biltong chicken sausage capicola picanha. Swine jowl turducken, filet mignon hamburger pork loin pancetta salami shank tail andouille frankfurter. Buffalo picanha biltong pork chop.
    </p>
      <p>
        Kevin pancetta beef ribs swine short ribs, ground round tenderloin salami ribeye spare ribs drumstick short loin cow meatloaf capicola. Burgdoggen short ribs strip steak picanha buffalo ribeye pork pork loin alcatra. Beef ribs beef t-bone tenderloin boudin. Venison cow andouille t-bone, hamburger beef ribs drumstick chuck kielbasa corned beef tenderloin.
    </p>
      <h3>Write your comment</h3>
      <form onSubmit={postFormValue}>
        <input
          value={user}
          onChange={e => setUser(e.target.value)}
          name="user"
          placeholder="Name..."
        />
        <br />
        <textarea
          value={post}
          onChange={e => setPost(e.target.value)}
          name="post"
          placeholder="Write your comment here..."
          rows="10"
          cols="150"
        />
        <br />
        <br />
        <button type="submit">Post it</button>
      </form>
      <br />
      <hr />
      <h3>List of comments</h3>
      {comments.length > 0 &&
        comments.map(({user, post}) => (
          <div>
            <p>{user}</p>
            <p>{post}</p>
            <hr />
          </div>
        ))
      }

    </div>
  )
};

export default App;
