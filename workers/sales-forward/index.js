/**
 * Cloudflare Email Worker: copy sales@wandagroups.com to both inboxes.
 * Destinations must stay Verified in Email Routing → Destination Addresses.
 */
export default {
  async email(message) {
    await message.forward('mehroj3590@gmail.com')
    await message.forward('shoxrux96@qq.com')
  },
}
