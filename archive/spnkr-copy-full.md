# SPNKr case study — copy deck

Every piece of text on the page, in order. **Edit the text under each ID.**
Leave the `[NN]` markers and the `---` separators alone; they're how the copy
gets put back in the right place.

Inline tags like `<strong>`, `<em>` and `<span class="accent">` are kept so
formatting survives. Keep them, move them, or delete them — your call.

When you're done, hand this file back and I'll apply it with `npm run copy:apply`.

---

## HERO

**[02]** · _HERO LABEL_

Personal Work // Self-Hosted Tooling

---

**[03]** · _PAGE TITLE_

SPNKr

---

**[04]** · _meta label_

Role

---

**[05]** · _meta value_

Solo, Design &amp; Build

---

**[06]** · _meta label_

Discipline

---

**[07]** · _meta value_

Product Design · Art Direction · Frontend

---

**[08]** · _meta label_

Stack

---

**[09]** · _meta value_

Node · Socket.IO · SQLite · Vanilla JS

---

**[10]** · _meta label_

Status

---

**[11]** · _meta value_

Running in production, at home

---

**[12]** · _photo caption_

The actual thing, on the actual machine. Eight game servers where I used to
          be able to afford two.

---

## WHY

**[13]** · _SECTION LABEL_

01 // The bill

---

**[14]** · _SECTION HEADING_

I was renting two servers and wanting a <span class="accent" data-copy="15">third</span>.

---

**[16]** · _paragraph_

For a couple of years I paid a hosting company about <strong>$30 a month</strong> to
        run two dedicated game servers. That money bought exactly two games. Wanting a third
        meant paying for a third, or tearing one down and losing the world in it.

---

**[17]** · _paragraph_

The rented boxes were also mediocre, and closed. Underpowered hardware on someone
        else&rsquo;s network, behind a panel I couldn&rsquo;t change. Adding a mod, editing a
        config, pulling a save down to look at it, all of it went through whatever the panel
        felt like exposing.

---

**[18]** · _paragraph_

Meanwhile a perfectly good computer sat in the next room doing nothing. Better CPU,
        better internet, and every file on it mine to touch.

---

**[19]** · _big number_

$0

---

**[20]** · _number caption_

Monthly hosting, down from about $30

---

**[21]** · _big number_

8

---

**[22]** · _number caption_

Game servers configured, up from two

---

**[23]** · _big number_

100%

---

**[24]** · _number caption_

File access, for mods, configs and saves

---

**[25]** · _>> PULL QUOTE_

The marginal cost of one more game went to zero. So we started adding games.

---

**[26]** · _paragraph_

Roughly $360 a year saved, against the electricity of a machine already plugged in.
        But the savings aren&rsquo;t what changed how we play. We now run things nobody would
        have paid fifteen dollars a month to try.

---

## V1

**[27]** · _SECTION LABEL_

02 // Version one

---

**[28]** · _SECTION HEADING_

It worked. That was the whole brief.

---

**[29]** · _paragraph_

Start, stop, restart. Player counts. Scheduled restarts. Automatic backups. Crash
        detection that brings a server back on its own. Discord commands so friends could
        start a server without me being home, or awake.

---

**[30]** · _paragraph_

All of it worked. I used it daily for four months. It looked like this:

---

**[31]** · _photo caption_

Version one. Functional, and completely anonymous.

---

**[32]** · _paragraph_

Indigo on blue-black. Soft shadows, sixteen-pixel corners, four stacked config rows
        per card each opening its own modal, and two animations that pulsed forever. It&rsquo;s
        the exact interface you get when nothing is decided and everything is generated,
        which is what happened. I was solving the hosting problem and letting defaults land.

---

## LEARNED

**[33]** · _SECTION LABEL_

03 // Four months of using it

---

**[34]** · _SECTION HEADING_

Living with a tool tells you what a mockup won&rsquo;t.

---

**[35]** · _paragraph_

<strong>I never read most of the card.</strong> Eleven data points at the same size,
        and I only ever wanted three: is it up, is anyone on it, what&rsquo;s the address. The
        backup retention count is something I set once a year, and it was taking up half the
        card.

---

**[36]** · _paragraph_

<strong>There was no stop button.</strong> The only way to shut a server down was a
        toggle labelled for what happens on boot. I knew because I wrote it. Nobody else did.

---

**[37]** · _paragraph_

<strong>It lives on a second monitor.</strong> Two infinite pulse animations
        weren&rsquo;t a nice touch, they were something twitching in my peripheral vision for
        hours.

---

**[38]** · _paragraph_

<strong>Four modals for one task.</strong> Setting up a server meant opening Schedule,
        closing it, opening Backups, closing it, opening Idle.

---

## WHY REDESIGN

**[39]** · _SECTION LABEL_

04 // Why redo it

---

**[40]** · _SECTION HEADING_

It worked for me. That&rsquo;s a low bar.

---

**[41]** · _paragraph_

Building it took a long stretch of decisions in code, and once it was working I just
        used it. Four months of dogfooding later, it had earned a real pass, and I wanted to
        put it on GitHub so other people could stop paying rent too.

---

**[42]** · _paragraph_

That second goal changed the brief completely. A tool only I use can assume I know
        things. A tool anyone can set up cannot.

---

**[43]** · _>> PULL QUOTE_

Open sourcing it meant designing for someone who has never seen it.

---

**[44]** · _paragraph_

The hardest part of self-hosting isn&rsquo;t the software, it&rsquo;s <strong>port
        forwarding</strong> &mdash; every router calls it something different, buries it
        somewhere different, and gets it wrong silently. I&rsquo;d needed help with it myself.
        So the redesign added real helper content: instructions written to work on any router,
        my machine&rsquo;s actual internal IP filled in, and a flag on the card until
        it&rsquo;s done.

---

**[45]** · _paragraph_

The same thinking covered the rest of setup. Installing dedicated servers and
        registering Windows services is genuinely tedious, and it&rsquo;s exactly what a coding
        agent is good at, so the app ships prompts ready to copy, written with the constraints
        that actually trip agents up. Then it all had to be tested properly &mdash; every
        screen size, empty states, a dropped connection, servers that report nothing.

---

## THE NAME

**[46]** · _SECTION LABEL_

05 // The name

---

**[47]** · _SECTION HEADING_

Everything in my house is named after <span class="accent" data-copy="48">Halo</span>.

---

**[49]** · _paragraph_

My phone is 343 Guilty Spark. My watch is Cortana. The AirPods are Truth and
        Reconciliation, the headset is Regret. Computers two and three are Scorpion and Wraith.
        The TVs are Arbiter and Spartan.

---

**[50]** · _paragraph_

So the new machine needed a name, and I&rsquo;d used most of the good ships and
        characters. The rocket launcher came up. SPNKr.

---

**[51]** · _>> PULL QUOTE_

Naming it was the first design decision, and it made every other one easier.

---

**[52]** · _paragraph_

The M41 is two tubes and a handle. Stubby, mechanical, unglamorous &mdash;
        <strong>equipment, not decoration</strong>. Once that was the target, the visual
        questions mostly answered themselves. Warm gunmetal instead of consumer blue-black.
        Two-pixel corners instead of sixteen. Borders doing the work instead of shadows. And
        one rule I wrote down before touching any markup, because the thing lives on a second
        monitor:

---

**[53]** · _>> PULL QUOTE_

Anything that moves while nothing has changed is a defect.

---

**[54]** · _paragraph_

That killed both pulse animations, made motion a signal rather than decoration, and
        later made me delete a scrolling ticker I&rsquo;d already built and liked.

---

## THE MARK

**[55]** · _SECTION LABEL_

06 // Working out the mark

---

**[56]** · _SECTION HEADING_

Most of it was deciding what it wasn&rsquo;t.

---

**[57]** · _paragraph_

Before the mark, the direction. I tried a few and rejected them for specific reasons.
        A clean ops-console look, Grafana-ish, was the safest and the most anonymous &mdash;
        the thing I was trying to get away from. Arcade CRT with scanlines and glow had the
        most personality but fought legibility on a dashboard you glance at to see if
        something is down. Swiss-industrial signage was close, but read as a poster, not as
        kit.

---

**[58]** · _paragraph_

What stuck was a field terminal. Issued, legible, unfussy.

---

**[59]** · _photo caption_

Working the mark out on paper.

---

**[60]** · _paragraph_

My first mark was two circles side by side, and it was wrong because I&rsquo;d drawn it
        from the <em>name</em> instead of the object. At sixteen pixels it read as
        &ldquo;oo&rdquo;. Glasses. Infinity symbol.

---

**[61]** · _paragraph_

Going back to an actual reference fixed it. The bores sit <strong>offset
        diagonally</strong>, inside a rounded housing &mdash; and that asymmetry is the whole
        identity. A symmetric pair reads as goggles no matter how you draw it.

---

**[62]** · _paragraph_

Then I tested four versions at every size they&rsquo;d actually appear. Thin outlined
        rings collapsed into mush below 24px. A capsule housing read as a map pin. A literal
        version with the receiver block drawn in turned to sludge under 32px. The one that
        survived was the simplest: bores knocked out of a solid housing, because a positive
        shape holds at sixteen pixels where an outline doesn&rsquo;t.

---

**[63]** · _>> PULL QUOTE_

If it only works at 96 pixels, it isn&rsquo;t the mark yet.

---

**[64]** · _paragraph_

Then it earned its keep. The mark&rsquo;s geometry recurs as the status readout on
        every card, two bars staggered to echo the bores. I tried stamping the actual logo on
        each card first &mdash; it read as branding, not instrumentation, and made the header
        mark feel cheaper by repetition. The abstraction was better.

---

**[65]** · _paragraph_

The last piece was making the spec enforceable. A checklist you&rsquo;re supposed to
        remember is a checklist nobody remembers, so a script now checks sixteen rules against
        the code: no shadows, no looping motion, corner cap, three semantic colors, every text
        color measured for contrast. Exceptions have to be declared inline with a written
        reason, and get reprinted on every run so they stay visible.

---

## BEFORE / AFTER

**[66]** · _SECTION LABEL_

07 // The difference

---

**[67]** · _SECTION HEADING_

Same servers. Same data. Same viewport.

---

**[68]** · _before/after tag_

Before

---

**[69]** · _before/after tag_

After

---

**[71]** · _table header_

Before

---

**[72]** · _table header_

After

---

**[73]** · _table cell_

Palette

---

**[74]** · _table cell_

Indigo on blue-black, five semantic colors

---

**[75]** · _table cell_

Gunmetal and amber, three

---

**[76]** · _table cell_

The card

---

**[77]** · _table cell_

Four stacked config rows, four separate modals

---

**[78]** · _table cell_

One panel, roughly half the height

---

**[79]** · _table cell_

Stopping a server

---

**[80]** · _table cell_

No stop button

---

**[81]** · _table cell_

Explicit stop, with confirmation

---

**[82]** · _table cell_

Reading state

---

**[83]** · _table cell_

A side stripe and an eight-pixel dot

---

**[84]** · _table cell_

Whole border keyed, surface recedes, tube readout

---

**[85]** · _table cell_

Motion

---

**[86]** · _table cell_

Two animations pulsing forever

---

**[87]** · _table cell_

Nothing moves unless something changed

---

**[88]** · _table cell_

Type

---

**[89]** · _table cell_

System sans, and a mono stack that resolved on neither platform

---

**[90]** · _table cell_

Barlow Condensed and IBM Plex Mono, self-hosted

---

**[91]** · _paragraph_

The rule that shaped the card: <strong>the card shows state, the panel owns
        settings.</strong> A chip only appears when something needs doing, and clicking it
        opens the panel scrolled to the fix.

---

## DETAILS

**[92]** · _SECTION LABEL_

08 // Details

---

**[93]** · _SECTION HEADING_

Four modals became one panel.

---

**[94]** · _photo caption_

Everything for one server, in one place.

---

**[95]** · _photo caption_

The step that trips everyone up, with real instructions and my actual internal IP
            filled in.

---

**[96]** · _photo caption_

Installing servers and registering Windows services, handed to an agent with
            prompts ready to copy.

---

**[97]** · _photo caption_

The one place motion is allowed. It stops the moment the server settles.

---

## GALLERY

**[98]** · _SECTION LABEL_

09 // In use

---

**[99]** · _SECTION HEADING_

Mostly read from a phone.

---

## CLOSE

**[100]** · _SECTION LABEL_

10 // Where it stands

---

**[101]** · _SECTION HEADING_

Running, at home, right now.

---

**[102]** · _paragraph_

Eight games on the spare machine, controlled from a browser or from Discord, and
        nobody pays a hosting company anything. It&rsquo;s on GitHub so anyone can do the same.

---

**[103]** · _paragraph_

The design pass also turned up a pile of engineering, because redesigning something
        means reading every file. The repository couldn&rsquo;t start from a clean clone. An
        apostrophe in a server password broke the copy button. The card grid was being
        destroyed and rebuilt four times a minute. And the player-count fallback reported
        &ldquo;unknown&rdquo; as &ldquo;zero&rdquo; &mdash; which mattered, because the
        auto-shutdown feature turns off servers it believes are empty.

---

**[104]** · _>> PULL QUOTE_

The design pass found the bugs. You have to read everything to redesign it.

---
