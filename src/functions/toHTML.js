const { Message } = require('discord.js')

Message.prototype.toHTML = async function() {
  let html = `<div class="message" id="${this.id}">`
  if(this.content) {
    html += `<div class="content"><div class="markdown">${cleanContent(this.content, this, {
      emojis: true,
      codeblock: true,
      mention: true,
      large: true
    })}</div></div>`
  }
  html += "</div>"
  return html
}

function cleanContent(str, message, options = {}) {
    str = str
    .replace(/\n/g, "<br>")
    // .replace(//g, "")
    // Menções
    if(options.mention !== false) {
      str = str.replace(/<@!?[0-9]+>/g, input => {
        const id = input.replace(/<|!|>|@/g, '');
  
        const member = message.channel.guild.members.cache.get(id);
        if (member) {
          return removeMentions(`<span class="mention">@${member.displayName}</span>`);
        } else {
          const user = message.client.users.cache.get(id);
          return user ? removeMentions(`<span class="mention">@${user.username}</span>`) : input;
      }
      })
      .replace(/<#[0-9]+>/g, input => {
          const channel = message.client.channels.cache.get(input.replace(/<|#|>/g, ''));
          return channel ? `<span class="mention">#${channel.name}</span>` : input;
      })
      .replace(/<@&[0-9]+>/g, input => {
          const role = message.guild.roles.cache.get(input.replace(/<|@|>|&/g, ''));
          let hex = "7289da";
          let rgb = [125, 125, 255];
          if(role.color != 0) {
              hex = decToHex(role.color);
              rgb = hexToRgb(hex);
          }; 
          return role ? `<span class="mention-role" style="color:#${hex};background:rgba(${rgb.join(", ")}, .1);">@${role.name}</span>` : input;
      })
      .replace(/@everyone/g, '<span class="mention-role" style="color:#7289da;background:rgba(125, 125, 255, .1);">@everyone</span>')
      .replace(/@here/g, '<span class="mention-role" style="color:#7289da;background:rgba(125, 125, 255, .1);">@here</span>')
    }

    if(options.codeblock !== false) str = str.replace(/\`\`\`(.*?)\`\`\`/ig,'<span class="code">$1</span>');
    if(options.emojis !== false) {
      if(message.emojis.size < 27 && options.emojilarge !== false) str = str.replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/g, '<img class="emoji-large" name="$2" animated="$1" src="https://cdn.discordapp.com/emojis/$3" />')
      else str = str.replace(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/g, '<img class="emoji-small" name="$2" animated="$1" src="https://cdn.discordapp.com/emojis/$3" />')
    }

    return str;
}
  
function removeMentions(str) {
    return str.replace(/@/g, '@\u200b');
}
  
function decToHex(d) {
    let hex = Number(d).toString(16);
    hex = "000000".substr(0, 6 - hex.length) + hex;
    return hex;
}
  
function hexToRgb(string) {
    let aRgbHex = string.match(/.{1,2}/g);
    let rgb = [
      parseInt(aRgbHex[0], 16),
      parseInt(aRgbHex[1], 16),
      parseInt(aRgbHex[2], 16)
    ];
    return rgb;
}