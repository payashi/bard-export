const exportConversation = function () {
  // Get a chat history container
  const scroller = document.querySelector('main infinite-scroller');

  // Get innerText from each dialog
  const getMessages = (dialog) => {
    const query = dialog.querySelector('user-query h2');
    const response = dialog.querySelector('model-response p');

    let msg = `You:  ${query.innerText}\nBard: ${response.innerText}\n`;
    return msg;
  }

  if (document.querySelector('user-query') == null) {
    alert('Try starting to chat with Bard!')
  } else {
    // Get text from each dialog
    const conversation = Array.from(scroller.children).map(getMessages).join('\n');

    console.log(conversation);
    // alert(conversation);
  }
}

chrome.action.onClicked.addListener(
  (tab) => {
    if (tab.url.includes('https://bard.google.com')) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: exportConversation
      });
    }
  }
);
