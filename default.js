// ロードされるまで待つ
const wait = () => {
    setTimeout(() => {
        if (document.getElementById('_chatText')) {
            main();
            return;
        }
        wait();
    }, 0);
};
wait();

// 処理
const main = () => {

    // チャットにテキスト入力
    const insert = (text) => () => {
        const chatText = document.getElementById('_chatText');
        const cursor = chatText.selectionStart;
        chatText.setSelectionRange(cursor, cursor);
        chatText.focus();
        document.execCommand('insertText', false, text);
    };

    // テキストをタグで囲む
    const surround = (startTag, endTag) => () => {
        const chatText = document.getElementById('_chatText');
        const selectedText = chatText.value.substring(chatText.selectionStart, chatText.selectionEnd);
        const replaceText = `${startTag}${selectedText}${endTag}`;
        chatText.focus();
        document.execCommand('insertText', false, replaceText);
        if (selectedText.length == 0) {
            const cursor = chatText.selectionStart - endTag.length;
            chatText.setSelectionRange(cursor, cursor);
        }
    };

    let text = '■単価変更依頼■※グロスとネット共に同じFMTになります。\n*******************************************************\n【広告主名】\n【案件名】\n【適用媒体】\n【単価変更前】	円\n　　　↓\n【単価変更後】	●円\n【変更開始日時】2017年●月●日●時●分\n【変更終了日時】未定\n【備考】\n*******************************************************';
    // ボタンエレメント作成
    let button = document.createElement('button');
    button.id = 'myButton';
    button.textContent = 'aaa';
    // ボタンクリックしたらinsert関数が動くようにする
    button.addEventListener('click', insert(text));

    // ツールバーにボタンを追加
    let sendToolbar = document.getElementById('_chatSendTool');
    sendToolbar.appendChild(button);
};